import * as faIcons from 'react-icons/fa';
import * as aiIcons from 'react-icons/ai';
import * as giIcons from 'react-icons/gi';
import * as mdIcons from 'react-icons/md';
import * as tiIcons from 'react-icons/ti';
import * as goIcons from 'react-icons/go';
import * as fiIcons from 'react-icons/fi';
import * as ioIcons from 'react-icons/io';
import * as riIcons from 'react-icons/ri';
import * as bsIcons from 'react-icons/bs';
import * as biIcons from 'react-icons/bi';
import * as cgIcons from 'react-icons/cg';
import * as vscIcons from 'react-icons/vsc';
import * as tbIcons from 'react-icons/tb';
import * as slIcons from 'react-icons/sl';
import * as imIcons from 'react-icons/im';
import * as ciIcons from 'react-icons/ci';
import * as fcIcons from 'react-icons/fc';
import * as PiICons from 'react-icons/pi';
import * as io5Icons from 'react-icons/io5';
import React from 'react';

interface ICommonIcon {
  icon: string;
  size?: number;
  className?: string;
}

const iconLibraries: { [key: string]: any } = {
  fa: faIcons,
  ai: aiIcons,
  gi: giIcons,
  md: mdIcons,
  ti: tiIcons,
  go: goIcons,
  fi: fiIcons,
  io: ioIcons,
  ri: riIcons,
  bs: bsIcons,
  bi: biIcons,
  cg: cgIcons,
  vsc: vscIcons,
  tb: tbIcons,
  sl: slIcons,
  im: imIcons,
  ci: ciIcons,
  fc: fcIcons,
  pi: PiICons,
  io5: io5Icons,
};

export const CommonIcon: React.FC<ICommonIcon> = ({
  icon,
  size = 19,
  className,
}) => {
  const lib = icon
    ?.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    ?.split(' ')[0]
    ?.toLowerCase();

  const IconLibrary = iconLibraries[lib];

  if (!IconLibrary) {
    console.error(`Icon library "${lib}" not found.`);
    return null;
  }

  const Icon = IconLibrary[icon];

  if (!Icon) {
    console.error(`Icon "${icon}" not found in library "${lib}".`);
    return null;
  }

  return <Icon size={size} className={className} />;
};
