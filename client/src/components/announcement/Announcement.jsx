import { useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function Announcement() {
    
    const [announceStyle, setAnnounceStyle] = useState('bg-[#c8f5d9] font-bold text-stone-600 flex items-center justify-center drop-shadow-lg');
    
    const handleClose = (e) => {
        e.preventDefault();
        setAnnounceStyle("hidden");
    };
  return (
    <div className= {announceStyle} >
        <h2>Hurry up it's 20% Sale</h2>
        <CloseOutlinedIcon className='cursor-pointer pl-[5px]' onClick={handleClose} />
    </div>
  )
}

export default Announcement;