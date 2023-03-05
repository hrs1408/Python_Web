import AdminLayout from '../../layouts/AdminLayout'
import SearchBar from '../../components/SearchBar'
import React from 'react'
import { Modal } from '@mui/material'
import Input from '../../components/Input'
import { useCreateUser, useUsers } from '../../services/UserService'
import EnhancedTable from '../../components/Table/users'
import { FormProvider, useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import toast from 'react-hot-toast'

const CreateUserSchema = object().shape({
  fullName: string().required('Vui lòng nhập họ tên'),
  password: string(),
  workAddress: string().required('Vui lòng nhập địa chỉ'),
  position: string().default(''),
  email: string().required('Vui lòng nhập email'),
  phone: string().required('Vui lòng nhập số điện thoại'),
  typeUser: string().required('Vui lòng chọn quyền'),
})

const Users = () => {
  const { data: users, refetch: getUsersAgain } = useUsers()

  const { mutateAsync: createUserAsync } = useCreateUser()

  const [open, setOpen] = React.useState(false)

  const methods = useForm<CreateUserType>({
    resolver: yupResolver(CreateUserSchema),
    defaultValues: {
      typeUser: 'USER',
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods

  const onSubmit = (data: CreateUserType) => {
    createUserAsync(data)
      .then(() => {
        toast.success('User Created')
        reset()
        setTimeout(() => {
          setOpen(!open)
        }, 1000)
      })
      .finally(() => {
        void getUsersAgain()
      })
  }

  return (
    <AdminLayout>
      <div className={'h-screen'}>
        <SearchBar />
        <div
          className={
            'flex items-center justify-between p-4 rounded bg-white mt-4 shadow'
          }
        >
          <p className={'text-xl font-bold'}>List User</p>
          <button
            className={'bg-yellow-400 px-4 py-2 rounded shadow'}
            onClick={() => {
              setOpen(!open)
            }}
          >
            Add User
          </button>
          <Modal
            open={open}
            onClose={() => {
              setOpen(!open)
            }}
          >
            <div
              className={
                'w-1/2  p-8 bg-white rounded shadow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
              }
            >
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex w-full">
                    {Object.keys(errors).length > 0 && (
                      <div className="p-4 rounded shadow bg-red-400 text-white my-4 w-full">
                        {Object.keys(errors).length > 0 && (
                          <div>
                            <ul>
                              {Object.entries(errors).map(([name, error]) => (
                                <li key={name}>{error.message}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className={'flex flex-col'}>
                    <p className={'text-2xl font-bold'}>Add User</p>
                    <div className={'w-full grid grid-cols-2 gap-4 mt-4'}>
                      <Input
                        label={'Full name'}
                        type={'text'}
                        name="fullName"
                      />
                      <Input
                        label={'Phone number'}
                        type={'text'}
                        name="phone"
                      />
                      <Input label={'Email'} type={'text'} name="email" />
                      <Input
                        label={'Password'}
                        type={'password'}
                        name="password"
                      />
                      <div className={'flex flex-col '}>
                        <label className={'font-bold'}>Role</label>
                        <select
                          {...register('typeUser')}
                          className={
                            'w-full px-4 py-3 mt-2 border rounded-md outline-none'
                          }
                        >
                          <option value="ADMIN">Admin</option>
                          <option value="USER">User</option>
                          <option value="STAFF">Staff</option>
                        </select>
                      </div>
                      <Input
                        label={'Address'}
                        type={'text'}
                        name="workAddress"
                      />
                    </div>
                    <div
                      className={
                        'flex items-center mt-8 gap-2 justify-end w-full'
                      }
                    >
                      <button
                        className={
                          'bg-yellow-400 px-4 py-2 rounded shadow hover:opacity-80 transition'
                        }
                        type={'submit'}
                      >
                        Add
                      </button>
                      <button
                        className={
                          'bg-gray-400 px-4 py-2 rounded shadow hover:opacity-80 transition'
                        }
                        type="reset"
                        onClick={() => {
                          setOpen(!open)
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </FormProvider>
            </div>
          </Modal>
        </div>
        <div className={'users-table mt-4'}>
          <EnhancedTable listUser={users?.data ?? []} />
        </div>
      </div>
    </AdminLayout>
  )
}

export default Users
