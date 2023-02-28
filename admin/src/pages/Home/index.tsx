import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {BiScan, BiSearch, BiX} from "react-icons/bi";
import { Modal } from "@mui/material";
import {TbFileInvoice} from "react-icons/tb";
import LineChart from "../../components/Chart/LineChart";
import {faker} from "@faker-js/faker";
import {NumericFormat} from 'react-number-format';
import {QrScanner} from '@yudiel/react-qr-scanner';
import SearchBar from "../../components/SearchBar";


const Home = () => {
    const [openQr, setOpenQr] = React.useState(false);

    const handleOpenQr = () => setOpenQr(true);
    const handleCloseQr = () => setOpenQr(false);

    const handleError = (error: any) => {
        error ? console.log(error) : console.log('No error')
    }

    const handleScan = (data: any) => {
        if (data) {
            console.log('Result: ', data)
        }
        setOpenQr(false)
    }

    return (
        <AdminLayout>
            <div className="home">
                <SearchBar/>
                <div className="statistic mt-4 flex gap-4">
                    <div className={'w-[75%]'}>
                        <div className={'bg-white rounded shadow my-4 p-2'}>
                            <div className="input-search flex items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <input type="text" placeholder={'Search invoice...'}
                                               className={'w-[500px] outline-none p-2 border rounded'}/>
                                        <button
                                            className="text-black bg-yellow-400 text-[20px] p-2 rounded-md hover:opacity-80 transition">
                                            <BiSearch/>
                                        </button>
                                        <button
                                            onClick={handleOpenQr}
                                            className="text-black bg-yellow-400 text-[20px] p-2 rounded-md hover:opacity-80 transition">
                                            <BiScan/>
                                        </button>
                                        <Modal
                                            open={openQr}
                                            onClose={handleCloseQr}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >

                                            <div
                                                className={'w-[500px] bg-white p-4 rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'}>
                                                <button onClick={handleCloseQr}
                                                        className={'ml-auto p-2 mb-2 rounded transition hover:bg-gray-100/80'}>
                                                    <BiX className={'text-[20px]'}/>
                                                </button>
                                                <QrScanner
                                                    onDecode={handleScan}
                                                    onError={handleError}
                                                />
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                                <select name="" id="" className={'p-2 outline-none border rounded'}>
                                    <option value="">All</option>
                                    <option value="">7 days ago</option>
                                    <option value="">15 days ago</option>
                                    <option value="">30 days ago</option>
                                </select>
                            </div>
                        </div>
                        <div className={'grid grid-cols-3 gap-3'}>
                            <div className="statistic-item p-4 bg-white rounded shadow">
                                <div className={'flex items-center gap-4'}>
                                    <div className={'p-1 bg-[#EEFBE7] rounded'}>
                                        <TbFileInvoice className={'text-[#71DD37] text-xl'}/>
                                    </div>
                                    <div className={'text-[16px] font-bold'}>Total Invoice COD</div>
                                </div>
                                <div>
                                    <div className={'text-[30px] font-bold text-center py-6'}>
                                        <NumericFormat value={faker.datatype.number({min: 1000, max: 9999})}
                                                       thousandsGroupStyle="thousand"
                                                       thousandSeparator=","
                                                       displayType={'text'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="statistic-item p-4 bg-white rounded shadow">
                                <div className={'flex items-center gap-4'}>
                                    <div className={'p-1 bg-[#E0F7FC] rounded'}>
                                        <TbFileInvoice className={'text-[#03C3EC] text-xl'}/>
                                    </div>
                                    <div className={'text-[16px] font-bold'}>Invoice Has Been Paid</div>
                                </div>
                                <div>
                                    <div className={'text-[30px] font-bold text-center py-6'}>
                                        <NumericFormat value={faker.datatype.number({min: 1000, max: 9999})}
                                                       thousandsGroupStyle="thousand"
                                                       thousandSeparator=","
                                                       displayType={'text'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="statistic-item p-4 bg-white rounded shadow">
                                <div className={'flex items-center gap-4'}>
                                    <div className={'p-1 bg-[#FFE7E3] rounded'}>
                                        <TbFileInvoice className={'text-[#FF3E1D] text-xl'}/>
                                    </div>
                                    <div className={'text-[16px] font-bold'}>Unpaid Invoice</div>
                                </div>
                                <div>
                                    <div className={'text-[30px] font-bold text-center py-6'}>
                                        <NumericFormat value={faker.datatype.number({min: 1000, max: 9999})}
                                                       thousandsGroupStyle="thousand"
                                                       thousandSeparator=","
                                                       displayType={'text'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main chart-wrapper p-4 bg-white mt-4 rounded shadow">
                            <LineChart/>
                        </div>
                    </div>
                    <div className={'w-[25%]'}>
                        <div className={'bg-yellow-400 flex justify-between rounded shadow my-4 p-4 py-6'}>
                            <img src="/images/cash.png" alt="" className={'w-[100px]'}/>
                            <div>
                                <p className={'text-[18px] text-right font-bold'}>Total collection (VND)</p>
                                <p className={'flex justify-center gap-2 text-[26px]'}>
                                    <span>
                                        <NumericFormat value={faker.datatype.number({min: 1000, max: 9999}) * 1000}
                                                       thousandsGroupStyle="thousand"
                                                       thousandSeparator=","
                                                       suffix={' VND'}
                                                       displayType={'text'}
                                        />
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className={'bg-yellow-400 flex justify-between rounded shadow my-4 p-4 py-6'}>
                            <img src="/images/shiping.png" alt="" className={'w-[100px]'}/>
                            <div>
                                <p className={'text-[18px] text-right font-bold'}>Shipping fee (VND)</p>
                                <p className={'flex justify-center gap-2 text-[26px]'}>
                                    <span>
                                        <NumericFormat value={faker.datatype.number({min: 1000, max: 9999}) * 1000}
                                                       thousandsGroupStyle="thousand"
                                                       thousandSeparator=","
                                                       suffix={' VND'}
                                                       displayType={'text'}
                                        />
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="sum-cod">
                            <div className={'bg-white rounded shadow my-4 p-4 py-6'}>
                                <p className={'text-[18px] font-bold'}>
                                    Total COD Amount By Month
                                </p>
                                <div className="list my-4">
                                    {
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
                                            return (
                                                <span className={'flex justify-between gap-3 py-2 w-full'}>
                                                    <span className={'font-bold text-left'}>{item}.</span>
                                                    <span className={'text-right'}>
                                                        <NumericFormat
                                                            value={faker.datatype.number({min: 1000, max: 9999}) * 1000}
                                                            thousandsGroupStyle="thousand"
                                                            thousandSeparator=","
                                                            suffix={' VND'}
                                                            displayType={'text'}
                                                        />
                                                    </span>
                                                </span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Home