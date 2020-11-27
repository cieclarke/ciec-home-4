import React, { Component } from 'react';

import { NavMenu } from './NavMenu';

export class Work extends Component {
    static displayName = Work.name;

    render() {
        return (
            <div className="relative">
                <div className="container opacity-25 bg-home-page bg-center bg-no-repeat h-screen min-w-full"></div>
                <div className="absolute top-0 left-0 w-full">
                    <div>
                        <NavMenu />
                        <main>
                            <h1 className="cc-work p-2">Projects & Work</h1>
                            <div><p className="p-2 pb-4 font-bold text-rosybrown-100">
                                <a href="https://github.com/cieclarke/ciec-home-4" className="underline text-rosybrown-100">
                                    Website Source Code
                                </a></p>
                            </div>
                            <div>
                                <span className="p-2 font-bold text-rosybrown-100">Libert&egrave; d'Expression</span>
                                <p className="p-2 text-rosybrown-100">A PHP project implementing the Yii MVC framework via Composer as dependency manager.</p>
                                <p className="p-2 text-rosybrown-100">Worked on with a previous colleague <a href="https://www.nickbergquist.uk/" className="underline text-rosybrown-100">Nick Bergquist</a></p>
                                <p className="p-2 text-rosybrown-100">
                                    Avaiable to see here: <a href="http://www.libertedexpression.co.uk/" className="underline text-rosybrown-100">Libert&egrave; d'Expression</a>
                                </p>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}
