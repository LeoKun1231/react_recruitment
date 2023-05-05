import { useMemoizedFn } from 'ahooks'
import { useLocation, useNavigate } from 'react-router-dom'

export const useGoToJob = (id?: string) => {
  const navigate = useNavigate()
  const handleGoToJobDetail = useMemoizedFn((jobId?: string) => {
    navigate('/main/home/job/detail', {
      state: {
        jobId: id ? id : jobId
      }
    })
  }) as any
  return {
    handleGoToJobDetail
  }
}
