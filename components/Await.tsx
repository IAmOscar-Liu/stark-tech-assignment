import { ReactNode } from "react";

async function Await<T>({
  promise,
  children,
}: {
  promise: Promise<T>;
  children: (value: T) => ReactNode;
}) {
  const data = await promise;

  return children(data);
}

export default Await;
