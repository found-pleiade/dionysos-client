import React from 'react';

type BigTitleProps = {
  title: string,
  subtitle: string,
  className: string
}

const BigTitle = ({
  title,
  subtitle,
  className,
}: BigTitleProps) => (
  <div className={className}>
    <h1 className="text-[6rem] -mb-6 font-black uppercase">{title}</h1>
    <h2 className="text-[2rem] font-semibold">{subtitle}</h2>
  </div>
);

export default BigTitle;
