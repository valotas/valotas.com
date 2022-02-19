import { h } from "preact";
import { Icon } from "./Icon";
import { VALOTAS } from "../utils";
import { Link } from "./Link";
import { MetaFileStore } from "../content/MetaFileStore";

interface HeaderProps {
  title: string;
  subtitle?: string;
  date?: string;
  metafileStore?: MetaFileStore;
}

export function Header({
  title,
  subtitle = VALOTAS,
  date,
  metafileStore,
}: HeaderProps) {
  return (
    <div className="header">
      <div className="container">
        <div className="photo">
          <Link className="radius" metafileStore={metafileStore} />
        </div>
        <div className="signature">
          <h1 className="signature-row">{title}</h1>
          <h4 className="signature-row">
            {subtitle} <Date date={date} />
          </h4>
          <div className="social signature-row">
            <a href="https://github.com/valotas" target="_blank">
              <Icon name="fa-github-square" size="2x" />
            </a>
            <a href="https://www.facebook.com/valotas" target="_blank">
              <Icon name="fa-facebook-square" size="2x" />
            </a>
            <a href="https://twitter.com/valotas" target="_blank">
              <Icon name="fa-twitter-square" size="2x" />
            </a>
            <a href="http://www.linkedin.com/in/valotas" target="_blank">
              <Icon name="fa-linkedin-square" size="2x" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Date({ date }) {
  if (!date) {
    return null;
  }
  return (
    <span className="date label">
      <Icon name="fa-pencil-square-o" />
      &nbsp;
      {date}
    </span>
  );
}
