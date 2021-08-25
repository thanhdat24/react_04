import { Fragment } from "react";
import Header from "../../components/Home/Header/Header";
import React from "react";
import { Route } from "react-router-dom";

export const HomeTemplate = (props) => {
  const { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Header />
            <Component {...propsRoute} />
          </Fragment>
        );
      }}
    />
  );
};
