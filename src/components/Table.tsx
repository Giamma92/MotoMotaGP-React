import type React from "react";

// https://codesandbox.io/s/generic-table-with-react-and-typescript-193s6?file=/src/App.tsx:881-1039

/** Helpers */

// helper to get an array containing the object values with
// the correct type infered.
function objectValues<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => obj[objKey as keyof T]);
}

function objectKeys<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => objKey as keyof T);
}

type PrimitiveType = string | Symbol | number | boolean;

// Type guard for the primitive types which will support printing
// out of the box
function isPrimitive(value: any): value is PrimitiveType {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "symbol"
  );
}

/** Component */

export interface MinTableItem {
  id: PrimitiveType;
}

export type TableHeaders<T extends MinTableItem> = Record<keyof T, string>;

type CustomRenderers<T extends MinTableItem> = Partial<
  Record<keyof T, (it: T) => React.ReactNode>
>;

interface TableProps<T extends MinTableItem> {
  items: T[];
  headers: TableHeaders<T>;
  customRenderers?: CustomRenderers<T>;
}

export default function Table<T extends MinTableItem>(props: TableProps<T>) {
  function renderRow(item: T) {
    let i = 0;
    return (
      <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        {objectKeys(item).map((itemProperty) => {
          const customRenderer = props.customRenderers?.[itemProperty];

          if (customRenderer) {
            return <td key={i++} className="p-3 text-left">{customRenderer(item)}</td>;
          }

          return (
            <td key={i++} className="p-3 text-left">{isPrimitive(item[itemProperty]) ? (item[itemProperty] as any) : ""}</td>
          );
        })}
      </tr>
    );
  }


  return (
    <table className="table-auto w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5 text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr className="flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
          {objectValues(props.headers).map((headerValue) => (
            <th key={headerValue} className="p-3 text-left">{headerValue}</th>
          ))}
        </tr>
      </thead>
      <tbody className='flex-1 sm:flex-none'>{props.items.map(renderRow)}</tbody>
    </table>
  );
}