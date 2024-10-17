import React, { useState, useEffect, useRef } from 'react'
import { MdOutlineUpdate, MdMoreTime, MdAccessTimeFilled } from "react-icons/md"
import moment from 'moment'
import 'moment-timezone'

const PageDateCalculate = () => {

    const refEventDate = useRef()

    const [camDate, setCamDate] = useState(false)
    const [eventDate, setEventDate] = useState(false)

    const _eventChangeDate = (e) => {

        if (e.target.value !== '') {
            const diff = diffDate(e.target.value.replace("T", " "), moment().format('YYYY-MM-DD HH:mm'));
            setCamDate(diff);
        } else {
            setCamDate(false);
            setEventDate(false);
        }
    }

    const _eventEventDate = (e) => {

        if (refEventDate.current.value!=='') {
            const selectedDate = new Date(refEventDate.current.value)
            const newTime = camDate.type === '+' ? new Date(selectedDate.getTime() + camDate.diff) : new Date(selectedDate.getTime() - camDate.diff);
    
            const timeInMillis = newTime.getTime();
            setEventDate(formatMillis(timeInMillis));
        }else{
            setEventDate(false);
        }

    }

    const formatMillis = (millis) => {
        const date = new Date(millis);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    useEffect(() => {
        eventDate !== false && _eventEventDate();
    }, [camDate])

    const diffDate = (date, nowDate) => {
        const d1 = new Date(date)
        const d2 = new Date(nowDate)

        if (d1 > d2) {
            const t = d1 - d2;
            const json = {
                days: Math.floor(t / (1000 * 60 * 60 * 24)),
                hours: Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)),
            }

            return {
                type: '+',
                diff: t,
                eventDate: null,
                msg: (json.days > 0 ? json.days + " GÜN " : '') + (json.hours > 0 ? json.hours + " SAAT " : '') + (json.minutes > 0 ? json.minutes + " DAKİKA " : '') + "İLERİ"
            }
        } else if (d2 > d1) {
            const t = d2 - d1;
            const json = {
                days: Math.floor(t / (1000 * 60 * 60 * 24)),
                hours: Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)),
            }

            return {
                type: '-',
                diff: t,
                eventDate: null,
                msg: (json.days > 0 ? json.days + " GÜN " : '') + (json.hours > 0 ? json.hours + " SAAT " : '') + (json.minutes > 0 ? json.minutes + " DAKİKA " : '') + "GERİ"
            }
        } else {
            return {
                type: '0',
                msg: "Kamera Saati GÜNCEL"
            }
        }
        return { days: 0, hours: 0, minutes: 0 }
    }

    return (
        <>
            <div className='flex flex-col gap-4 pb-2'>
                <div>
                    <label htmlFor="address" className='block mb-1 text-sm font-medium text-white'>Görüntünün Alındığı Adres</label>
                    <input type="text" name="address" id='address' autoComplete='off' className="border ring-0 outline-none text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="datetime" className='block mb-1 text-sm font-medium text-white'>Kamera Saati</label>
                    <input type="datetime-local" onChange={_eventChangeDate} name="datetime" id='datetime' autoComplete='off' className="border ring-0 outline-none text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" />
                </div>

                {camDate &&
                    <>
                        {
                            camDate.type === '-'
                                ? <div className='bg-red-600 text-white rounded-md flex overflow-hidden'>
                                    <div className='bg-red-700 p-3 text-4xl items-center flex text-red-900'><MdOutlineUpdate /></div>
                                    <div className='flex items-center p-3'><span>Kamera saati güncel saate göre<br /><strong className='text-red-950 font-black text-xl'>{camDate.msg}</strong></span></div>
                                </div>
                                : (
                                    camDate.type === '+'
                                        ? <div className='bg-green-600 text-white rounded-md flex overflow-hidden'>
                                            <div className='bg-green-700 p-3 text-4xl items-center flex text-green-900'><MdMoreTime /></div>
                                            <div className='flex items-center p-3'><span>Kamera saati güncel saate göre<br /><strong className='text-green-950 font-black text-xl'>{camDate.msg}</strong></span></div>
                                        </div>
                                        : <div className='bg-yellow-600 text-white rounded-md flex overflow-hidden'>
                                            <div className='bg-yellow-700 p-3 text-4xl items-center flex text-yellow-900'><MdMoreTime /></div>
                                            <div className='flex items-center p-3'><span><strong className='text-yellow-950 font-black text-xl'>{camDate.msg}</strong></span></div>
                                        </div>
                                )
                        }
                        {
                            camDate.type !== '0' &&
                            <>
                                <div className='pt-5 mt-2 border-t border-gray-600 border-dashed border-t'>
                                    <label htmlFor="eventtime" className='block mb-1 text-sm font-medium text-white'>İzlenmek İstenen Güncel Saat</label>
                                    <input ref={refEventDate} type="datetime-local" onChange={_eventEventDate} name="eventtime" id='eventtime' autoComplete='off' className="border ring-0 outline-none text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                {
                                    eventDate && <div className='bg-orange-600 text-white rounded-md flex overflow-hidden'>
                                        <div className='bg-orange-700 p-3 text-4xl items-center flex text-orange-900'><MdAccessTimeFilled /></div>
                                        <div className='flex items-center p-3 text-orange-950'><span className='text-sm leading-4'>İzlemek istenilen <span className='text-orange-300'>{formatDate(refEventDate.current.value)}</span> tarih ve saati için <span className='text-orange-300'>{camDate.msg}</span> olan kamerada bakman gereken zaman<br /><strong className='text-orange-950 font-black text-xl mt-1 inline-block'>{eventDate}</strong></span></div>
                                    </div>
                                }
                            </>
                        }
                    </>

                }
            </div>
        </>
    )
}

export default PageDateCalculate