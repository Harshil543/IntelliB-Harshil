import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import React from 'react';
// import Menu from './menu';
// import AddUser from './addUser';
// import CancelUser from './cancelModel';

interface props {
  name: string;
  contactNumber: string;
  email: string;
  designation: string;
  role: string;
}

export default function UserGridCard({
  name,
  contactNumber,
  email,
  designation,
  role
}: props) {
  // const [menuOpen, setMenuOpen] = React.useState(false);
  // const [visible, setVisible] = React.useState(false);
  // const [visibleDelete, setVisibleDelete] = React.useState(false);
  return (
    <div className={`rounded-[10px] border p-[17px]`}>
      <div className="flex w-[100%] items-center justify-between">
        <div className="poppins-semibold rounded-[5px] bg-[#FE9901] px-[6px] py-[3px] text-[13px] text-[#ffffff]">
          {role}
        </div>
        <DotsHorizontalIcon className="h-4 w-4" />
      </div>
      <div className="m-auto mt-[38px] h-[212px] w-[212px] overflow-hidden rounded-[10px] object-cover">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://s3-alpha-sig.figma.com/img/3260/3aa2/bb5a605bdf4f394aa9dbfdb440bdd68e?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=CMR~npUJDaQ2x1vzDwnYqKIIuQMVokv-FE4m6NmCrqclPTeIbomhkE-VS4UobbtJyiaAplfgnPsm7un3ufyHj9z-6tmOGWcN~-CXhPDbwipDf8vYcseE6uHdizetNb5QsF1hGBxx~pUXpEN5N4otVatEtLnb~PP53eTHqwL1fzWNl25hrvq~OZt9bJCZ9FsVnWvL80duE84sUV8cHteekLxMUZlPI6~0eHPzNzR40I9IZvF~xhDNovfdkYxqJwCheKrxVuVDdfngxLrA-8E0jtK5gz456MEsreew3oSGzcTAlDrJmcKEAL48e9tX8zY2UFnQrV3KmFVwQUB6WJKkTA__"
          alt=""
        />
      </div>
      <div className="poppins-semibold mt-[29px] text-center text-[16px] text-[#3a3a3a]">
        {name}
      </div>
      <div className="poppins-semibold text-center text-[16px] text-[#3a3a3a]">
        {contactNumber}
      </div>
      <div className="poppins-semibold text-center text-[16px] text-[#3a3a3a]">
        {email}
      </div>
      <div className="poppins-semibold text-center text-[16px] text-[#FC9901]">
        {designation}
      </div>
    </div>
  );
}
