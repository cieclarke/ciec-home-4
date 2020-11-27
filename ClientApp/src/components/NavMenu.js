import React, { Component } from 'react';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    render() {
        return (
            <nav>
                <div className="flex flex-row w-full">
                    <div className="flex-1 text-center cc-home">
                        <a className="block h-full text-2xl font-bold py-4" href="/">Home</a>
                    </div>
                    <div className="flex-1 text-center cc-photos">
                        <a className="block h-full text-2xl font-bold py-4" href="/Photos">Photos</a>
                    </div>
                    <div className="flex-1 text-center cc-work">
                        <a className="block h-full text-2xl font-bold py-4" href="/Work">Work</a>
                    </div>
                    <div className="flex-1 text-center cc-notes">
                        <a className="block h-full text-2xl font-bold py-4" href="/Notes">Notes</a>
                    </div>
                </div>
            </nav>
        );
    }
}
