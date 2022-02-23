import React from "react";
import { tw } from "twind";
import { Icon } from "./Icon";

interface HeaderProps {
  title: string;
  subtitle?: string;
  date?: string;
}

export function Header({ title, date, subtitle }: HeaderProps) {
  return (
    <div className={tw`relative z-20 flex justify-between items-center`}>
      <h1 className="signature-row">{title}</h1>
      <h4 className="signature-row">
        {subtitle || ""} <Date date={date} />
      </h4>

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
      </a>asdasd
    </div>
  );
}

function Date({ date }: Pick<HeaderProps, "date">) {
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
