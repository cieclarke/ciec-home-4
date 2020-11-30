import React, { Component } from 'react';

import { NavMenu } from './NavMenu';

export class Work extends Component {
    static displayName = Work.name;

    render() {
        return (
            <div id="content">
                <div></div>
                <div>
                    <div>
                        <NavMenu />
                        <main>
                            <h1 className="cc-work">Projects & Work</h1>
                            <div className="cc-divide cc-work-divide">
                                <div>
                                    <h2>cieclarke.com</h2>
                                    <p>
                                    <a href="https://github.com/cieclarke/ciec-home-4">
                                            Website Source Code
                                    </a>
                                        </p>
                                </div>
                                <div>
                                    <h2>Libert&egrave; d'Expression</h2>
                                    <p>A PHP project implementing the Yii MVC framework via Composer as dependency manager.</p>
                                    <p>Worked on with a previous colleague <a href="https://www.nickbergquist.uk/">Nick Bergquist</a></p>
                                    <p>
                                        Avaiable to see here: <a href="http://www.libertedexpression.co.uk/">Libert&egrave; d'Expression</a>
                                    </p>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}
