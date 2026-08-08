import React from 'react';
import { Link } from 'react-router-dom';
import DuoImage from './DuoImage';

function DepartmentRow({ id, num, title, description, tags, imgUrl }) {
  const isClickable = !!id;
  const RowComponent = isClickable ? Link : 'div';
  
  return (
    <RowComponent 
      to={isClickable ? `/departments/${id}` : undefined}
      className="num-row grid grid-cols-[56px_1fr_220px] gap-7 items-center py-8 border-t border-[var(--line)] last:border-b max-md:grid-cols-1 max-md:gap-[14px] no-underline block"
    >
      <span className="num font-mono text-[var(--ink-soft)] text-[14px]">
        {num}
      </span>
      <div>
        <h3 className="text-[22px] font-display font-bold mb-2 text-[var(--ink)]">
          {title}
        </h3>
        <p className="text-[var(--ink-soft)] text-[14px] leading-relaxed max-w-[460px]">
          {description}
        </p>
        <div className="tags flex gap-2 mt-3 flex-wrap">
          {tags.map((tag, idx) => (
            <span key={idx} className="tag font-mono text-[10px] tracking-[0.05em] uppercase px-[10px] py-[5px] rounded-full border border-[var(--line)] text-[var(--ink-soft)]">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="num-thumb aspect-square rounded-[4px] overflow-hidden max-md:w-[100px]">
        <DuoImage 
          src={imgUrl} 
          alt={title} 
          className="w-full h-full" 
          hoverEffect={true} 
        />
      </div>
    </RowComponent>
  );
}

export default DepartmentRow;
