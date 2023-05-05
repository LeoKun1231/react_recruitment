import { useMemoizedFn } from 'ahooks'
import { useNavigate } from 'react-router-dom'

export const useGoToCompany = (id?: string) => {
  const navigate = useNavigate()
  const handleGoToCompamyDetail = useMemoizedFn((companyId?: string) => {
    navigate('/main/home/company/detail', {
      state: {
        companyId: id ? id : companyId
      }
    })
  }) as any
  return {
    handleGoToCompamyDetail
  }
}
