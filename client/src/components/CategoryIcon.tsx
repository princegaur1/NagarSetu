import React from 'react';
import Image from 'next/image';

interface CategoryIconProps {
  icon: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ 
  icon, 
  color = '#6B7280', 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  // Map category icons to PNG files
  const iconMap: { [key: string]: string } = {
    // Education category
    'book': '/icons/education.png',
    'education': '/icons/education.png',
    
    // Electricity category
    'bolt': '/icons/lightning.png',
    'lightning': '/icons/lightning.png',
    'electricity': '/icons/lightning.png',
    
    // Environment/Green category
    'leaf': '/icons/green-earth.png',
    'green': '/icons/green-earth.png',
    'environment': '/icons/green-earth.png',
    
    // Health category
    'heart': '/icons/patient.png',
    'health': '/icons/patient.png',
    'medical': '/icons/patient.png',
    
    // Public Safety category
    'shield': '/icons/public-safety.png',
    'safety': '/icons/public-safety.png',
    'security': '/icons/public-safety.png',
    
    // Roads & Infrastructure category
    'road': '/icons/street.png',
    'roads': '/icons/street.png',
    'infrastructure': '/icons/street.png',
    'street': '/icons/street.png',
    
    // Transportation category
    'bus': '/icons/transportation.png',
    'transport': '/icons/transportation.png',
    'transportation': '/icons/transportation.png',
    
    // Waste Management category
    'trash': '/icons/waste.png',
    'waste': '/icons/waste.png',
    'garbage': '/icons/waste.png',
    
    // Water & Sanitation category
    'water': '/icons/quality.png',
    'sanitation': '/icons/quality.png',
    'quality': '/icons/quality.png',
    
    // Default/More category
    'more': '/icons/ellipsis.png',
    'folder': '/icons/ellipsis.png',
    'other': '/icons/ellipsis.png'
  };

  const iconPath = iconMap[icon] || '/icons/ellipsis.png';

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
      <Image
        src={iconPath}
        alt={`${icon} icon`}
        width={size === 'sm' ? 24 : size === 'md' ? 32 : 48}
        height={size === 'sm' ? 24 : size === 'md' ? 32 : 48}
        className="object-contain"
        style={{ filter: color !== '#6B7280' ? `hue-rotate(${Math.random() * 360}deg)` : 'none' }}
      />
    </div>
  );
};

export default CategoryIcon;

