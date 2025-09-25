import React from 'react';

export default function ListItemCheckbox({
  checked,
  onChange,
  left,
  right,
  className = '',
  hover = true,
  padded = true,
  border = true,
}) {
  return (
    <label
      className={[
        'flex items-center justify-between rounded-lg',
        border ? 'border border-gray-100' : '',
        padded ? 'px-3 py-2' : '',
        hover ? 'hover:bg-gray-50 transition' : '',
        className
      ].join(' ')}
    >
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          className="h-4 w-4 text-main-dark"
          checked={checked}
          onChange={onChange}
        />
        {left}
      </span>
      {right}
    </label>
  );
}
