import Image from 'next/image';
import NavLinks from './NavLinks';

const HeaderPage = () => {

    const date = new Date().toLocaleDateString
        (
            "bn-BD", {
            dateStyle: "full"
        }
        )
    console.log(date)

    return (
        <div className=' container mx-auto py-5'>
            <div className=' relative flex items-center justify-center'>
                <div className=' flex items-center gap3'>
                    <Image
                        className='w-10 h-10'
                        height={50}
                        width={50}
                        src={'/logo.webp'}
                        alt='Logo'>
                    </Image>
                </div>
                <div>
                    <p className=' font-bold text-2xl items-start text-[#c00107]'>Bangla News 24</p>
                    <p className=' text-sm text-gray-400'>{date}</p>
                </div>
                <div className=' absolute right-0 flex justify-end  gap-4'>
                    <button className=' hover:text-[#c00107]'>সাইন ইন</button>
                    <button className='btn bg-[#c00107] text-white hover:bg-[#721c1f]'>সাইন আপ</button>
                </div>
            </div>
            <NavLinks></NavLinks>
        </div>
    );
};

export default HeaderPage;