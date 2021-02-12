import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Switch, Route } from "react-router-dom";
import Theme from "styles/Theme";
import routes from "routes";

export default function App(): JSX.Element {
  return (
    <ThemeProvider theme={Theme}>
      <StyledApp className="app">
        <Switch>
          {routes.map((route, index) => (
            <Route
              path={route.path}
              exact
              key={index}
              render={(props) =>
                React.createElement(route.component, {
                  ...props,
                })
              }
            />
          ))}
        </Switch>
      </StyledApp>
    </ThemeProvider>
  );
}

const StyledApp = styled.div`
  background-color: ${({ theme }) => theme.colors.dark};
  color: white;
`;
