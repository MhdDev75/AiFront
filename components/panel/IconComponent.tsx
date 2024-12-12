import React from 'react';
import * as Icons from 'lucide-react';

interface DynamicIconProps {
  name: keyof typeof Icons;
  size?: number;
  color?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, size = 24, color = 'white' }) => {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    return null; // در صورتی که آیکون معتبر نباشد
  }

  return <IconComponent size={size} color={color} />;
};

export default DynamicIcon;
