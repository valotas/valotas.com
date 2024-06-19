import { PageProps } from "$fresh/server.ts";

export default function Greet(props: PageProps) {
  return <div>Page: {props.params.name}</div>;
}
