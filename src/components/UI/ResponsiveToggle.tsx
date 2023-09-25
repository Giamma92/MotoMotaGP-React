import 'scss/UI/ResponsiveToggle.scss';

import { ReactComponent as ToggleMenuSvg } from 'assets/img/toggleMenu.svg';


function ResponsiveToggle() {

    // variables
    const mainNav = document.querySelector('#main-navigation')
    const mobileNavigation = mainNav?.querySelector('.mobile-menu')
    const responsiveToggle = mainNav?.querySelector('.responsive-toggle')
    const menuIconLabels = mainNav?.querySelectorAll('.sr-only');
    const mediaQuery = window.matchMedia('(min-width: 48em)')

    // functions
    const openMenu = (toggle: any) => {
        menuIconLabels?.forEach(menuIconLabel => {
            menuIconLabel.classList.remove('sr-only')
        })
        toggle.setAttribute('aria-expanded', true)
        toggle.setAttribute('aria-label', 'Close menu navigation')
        toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12 7 7m5 5 5 5m-5-5 5-5m-5 5-5 5"/></svg>`
    }

    const closeMenu = (toggle: any) => {
        menuIconLabels?.forEach(menuIconLabel => {
            menuIconLabel.classList.add('sr-only');
        })
        toggle.setAttribute('aria-expanded', false);
        toggle.setAttribute('aria-label', 'Open menu navigation');
        toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 8h12M6 12h12M6 16h12"/></svg>`;
    }

    // execution
    responsiveToggle?.addEventListener('click', _ => {
        mobileNavigation?.classList.toggle('show');
        mobileNavigation?.classList.contains('show')
            ? openMenu(responsiveToggle)
            : closeMenu(responsiveToggle);
    })

    window.addEventListener('resize', () => {
        const menuIconLabels = mainNav?.querySelectorAll('span');

        if (mediaQuery.matches) {
            mobileNavigation?.classList.remove('show');
                closeMenu(responsiveToggle)
            } else {
                menuIconLabels?.forEach(menuIconLabel => {
                    menuIconLabel.classList.remove('sr-only');
                })
        }
    })

    return (
        <button className="responsive-toggle" aria-expanded="false" aria-label="Open menu navigation">
            <ToggleMenuSvg />
        </button>
    );
}

export default ResponsiveToggle;
