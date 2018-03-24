import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MainPage from '../components/MainPage';
import EditorPage from '../components/EditorPage';

class AppRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route 
                            path="/"
                            component={MainPage}
                            exact={true}
                        />

                        <Route
                            path="/editor"
                            component={EditorPage}
                            exact={true}
                        />

                        <Route 
                            path="*" 
                            component={() => {
                                return <Redirect to={'/'} />;
                            }
                        } />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
