import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import TopBarProgress from "react-topbar-progress-indicator";
import { useSpinDelay } from "spin-delay";
import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico" },
];

export const meta: MetaFunction = () => [
  { title: "Closure Wiki" },
  { name: "description", content: "Welcome to Closure's Wiki, Doctor!" },
];

function Progress() {
  const { state } = useNavigation()
  const showProgress = useSpinDelay(state !== 'idle')
  return <>{showProgress && <TopBarProgress />}</>
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
        <Progress />
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// export function ErrorBoundary() {
//   const error = useRouteError()
//   if (isRouteErrorResponse(error)) {
//     switch (error.status) {
//       case 403:
//         return <ErrorUnauthorized />
//       case 404:
//         return <ErrorNotFound />
//       default:
//         return <ErrorUnexpected>HTTP {error.status}</ErrorUnexpected>
//     }
//   } else {
//     console.error(error)
//     return <ErrorUnexpected />
//   }
// }

export default function App() {
  return <Outlet />;
}
