export function DropDown({options, onOptionSelected}: any) {

    function createSelectItems() {
        let items = [];
        let optionList = options || [];
        //console.log(optionList);

        for (let i = 0; i <= optionList.length; i++) {   
            const option = optionList[i];          
            items.push(<option key={i} value={option?.id}>{option?.value}</option>);   
             //here I will be creating my options dynamically based on
             //what props are currently passed to the parent component
        }
        return items;
    };
    
    
    return (<select required onChange={onOptionSelected}>
        <option key="-1" value="">-</option>)
        {createSelectItems()}
    </select>)
}

export default DropDown;
