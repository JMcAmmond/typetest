import React, { useContext } from "react";
import TestModel from "../models/TestModel";

export const TestContext = React.createContext(new TestModel());
export const TestContextProvider = TestContext.Provider;

export const useTestContext = () => useContext(TestContext);