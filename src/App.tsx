import React from "react";

import { Refine } from "@pankod/refine-core";
import {
  AuthPage,
  notificationProvider,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/reset.css";

import { dataProvider, liveProvider } from "@pankod/refine-supabase";
import { AntdInferencer } from "@pankod/refine-inferencer/antd";
import routerProvider from "@pankod/refine-react-router-v6";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import { supabaseClient } from "utility";
import { ColorModeContextProvider } from "contexts";
import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea,
} from "components/layout";
import authProvider from "./authProvider";

function App() {
  return (
    <ColorModeContextProvider>
      <RefineKbarProvider>
        <Refine
          dataProvider={dataProvider(supabaseClient)}
          liveProvider={liveProvider(supabaseClient)}
          authProvider={authProvider}
          routerProvider={{
            ...routerProvider,
            routes: [
              {
                path: "/register",
                element: <AuthPage type="register" />,
              },
              {
                path: "/forgot-password",
                element: <AuthPage type="forgotPassword" />,
              },
              {
                path: "/update-password",
                element: <AuthPage type="updatePassword" />,
              },
            ],
          }}
          LoginPage={() => (
            <AuthPage
              type="login"
              providers={[
                {
                  name: "google",
                  label: "Sign in with Google",
                },
              ]}
              formProps={{
                initialValues: {
                  email: "info@refine.dev",
                  password: "refine-supabase",
                },
              }}
            />
          )}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "posts",
              list: AntdInferencer,
              edit: AntdInferencer,
              show: AntdInferencer,
              create: AntdInferencer,
              canDelete: true,
            },
          ]}
          Title={Title}
          Header={Header}
          Sider={Sider}
          Footer={Footer}
          Layout={Layout}
          OffLayoutArea={OffLayoutArea}
        />
      </RefineKbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;