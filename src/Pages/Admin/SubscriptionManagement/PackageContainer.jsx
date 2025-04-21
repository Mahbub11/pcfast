import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputNumber, Skeleton } from 'antd';
import { deletePackage, getPackageRequest, savePackage } from '../../../redux/adminslice/Package';
import { Space, Table, Tag } from 'antd';
import { Radio, Select } from 'antd';




function PackageContainer(props) {
    const dispatch = useDispatch()
    const [packageList, setPackageList] = useState([])
    const [busy, setBusy] = useState(true)
    const { list } = useSelector((state) => state.package)
    const [state, setState] = useState(0)
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [modulePermission, setModulePermission] = useState()
    const [price, setPrice] = useState()
    const [day, setDay] = useState()
    const [fetch, setFetch] = useState(true)



    useEffect(() => {

        dispatch(getPackageRequest())
        setPackageList(list)

        setBusy(false)

    }, [busy, state, fetch])

    console.log(packageList)




    const handlemodulePermission = (e) => {
        setModulePermission(e.target.value);
    };
    const handleSave = () => {
        const data = {
            name,
            description,
            module_permission: modulePermission,
            day,
            price
        }

        dispatch(savePackage(data))
        setFetch(!fetch)
    }
    const columns = [
        {
            title: "id",
            dataIndex: "id",
            key: "id",
            render: (id, record) => (
                <div>
                    {
    
                        <p>{record.id}</p>
                    }
                </div>
            ),
        },
        {
            title: "name",
            dataIndex: "name",
            key: "name",
            render: (level, record) => (
                <div className="text-[21px] font-montserrat font-[400] ">
                    {
                        record.name
                    }
                </div>
            ),
        },
        {
            title: "Descriptions",
            dataIndex: "description",
            key: "description",
            render: (type, record) => (
                <div className="text-[21px] font-montserrat font-[400] ">
                    {
                        record.description
                    }
                </div>
            ),
        },
        {
            title: "Module Permission",
            dataIndex: "module_permission",
            key: "module_permission",
            render: (type, record) => (
                <div className="text-[21px] font-montserrat font-[400] ">
                    {
                       
                        record.module_permission ? 'Granted':'Not Granted'
                    }
                </div>
            ),
        },
        {
            title: "Day",
            dataIndex: "day",
            key: "day",
            render: (type, record) => (
                <div className="text-[21px] font-montserrat font-[400] ">
                    <p>
                    {
                        record.day
                    }
                    {" "}
                    Days
                    </p>
                </div>
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (type, record) => (
                <div className="text-[21px] font-montserrat font-[400] ">
                    <p>$ {
                        record.price
                    }</p>
                </div>
            ),
        },
        {
            title: "Action",
            dataIndex: "addition",
            key: "addition",
            render: (text, record) => (
                <div className="text-[21px] font-montserrat font-[400] md:flex md:gap-10 flex">
                  <button onClick={()=>{
                    dispatch(deletePackage(record.id))
                    
                  }} className='bg-tahiti px-1 py-1 rounded-md'>Delete</button>
                </div>
            ),
        },
    ];

    return (
        <div>
            {
                busy ? <Skeleton></Skeleton> :
                    <div className='mt-10'>

                        <div>
                            <h1 className='text-center text-[25px]'>Package Management</h1>
                            <div className='mt-10'>
                                <div className='flex gap-5 px-2 py-2'>
                                    <button className='bg-tahiti px-3 py-3 rounded-md'>Create Package</button>
                                    <button className='bg-tahiti px-3 py-3 rounded-md'>Create Mock List</button>
                                </div>
                                <Table columns={columns} dataSource={packageList} />
                            </div>
                        </div>

                        <div>


                            {
                                state === 0 ?
                                    <div className='h-auto mt-5 px-2 py-2'>
                                        <h1 className='text-center text-[30px]'>Create Package</h1>
                                        <div className='flex w-[50%] m-auto flex-col gap-5 justify-center mt-10'>

                                            <input value={name} onChange={(e) => setName(e.target.value)} className='h-10 px-2 py-2 ' placeholder='Enter Package Name'></input>
                                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='px-2 py-2' rows={4} placeholder='Enter Descriptions'></textarea>
                                            <div>
                                                <h1 className='text-[20px] py-2'>Module Practice Permission</h1>
                                                <Radio.Group value={modulePermission} onChange={handlemodulePermission}>
                                                    <Radio.Button value={false}>Grant</Radio.Button>
                                                    <Radio.Button value={true}>Not Grant</Radio.Button>

                                                </Radio.Group>
                                            </div>

                                            <div className='flex gap-5 flex-col'>
                                                <InputNumber className='w-[20%]' placeholder='Input Day' value={day} onChange={(e) => setDay(e)}></InputNumber>
                                                <InputNumber className='w-[20%]' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e)}></InputNumber>
                                            </div>

                                        </div>
                                        <button onClick={handleSave} className='mt-5 rounded-md flex justify-center w-[30%] m-auto px-3 py-3 bg-tahiti'>Save Package</button>
                                    </div> : ''
                            }
                        </div>


                    </div>


            }
        </div>
    );
}

export default PackageContainer;