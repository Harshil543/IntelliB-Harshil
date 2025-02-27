'use client';
import { Input } from '@/components/ui/input';
import React from 'react';
// import FiltersTag from '../../component/filtersTag';
// import ToggleButton from '../../component/toggleButton';
// import ListView from './listView';
// import GridView from './gridView';

export default function TenantUsers() {
  // const [visible, setVisible] = useState(false);
  // const [listView, setListView] = useState(() => {
  //   const storedView = localStorage.getItem('listView');
  //   if (storedView !== null) {
  //     return JSON.parse(storedView);
  //   } else {
  //     return true;
  //   }
  // });
  return (
    <div className="mt-[24px] rounded-[20px] bg-[#ffffff] p-[15px]">
      <div className="flex flex-wrap items-center justify-end gap-[10px]">
        <div></div>
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/search.svg"
            width={'20px'}
            className="absolute left-3 top-[10px]"
            alt=""
          />
          <Input
            placeholder={'Search...'}
            // onChange={(e) => console.log(e.target.value)}
            className="poppins w-[100%] rounded-[8px] border-border py-[9px] pl-[40px] pr-[20px] lg:w-[355px]"
          />
        </div>
        {/* <div className="ml-[14px]">
          <FiltersTag text="Filters" imgSrc="/filter.svg" />
        </div>
        <div className="ml-[14px]">
          <ToggleButton listView={listView} setListView={setListView} />
        </div>
        <div className="ml-[14px]" onClick={() => setVisible(true)}>
          <FiltersTag text="Add User" imgSrc="/add-user.svg" />
        </div>
        <AddUser title="Add User" visible={visible} setVisible={setVisible} /> */}
      </div>
      {/* {listView ? <ListView /> : <GridView />} */}
    </div>
  );
}
