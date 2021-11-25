import moment from 'moment'
import { useEffect, useState } from 'react'
import { performanceInteractor } from '../../../core/interactors'
import { PerformanceIF } from '../../../interface'

const usePerformanceInit = () => {
  const [quota, setQuota] = useState<PerformanceIF.PerformanceQuota>()
  const [performanceParam, setPerformanceParam] = useState<PerformanceIF.PerformanceParam>({
    time_grain: 'minute',
    start_time: moment().format('YYYY-MM-DD'),
    end_time: moment().format('YYYY-MM-DD')
  })
  const [stackConsumes, setStackConsumes] = useState<any>([])
  const [pageList, setPageList] = useState<Array<PerformanceIF.PerformancePageList>>([])
  const [performanceConsumes, setPerformanceConsumes] = useState<{
    pv: Array<{
      time: string
      value: number
      type: string
    }>
    timeConsumes: Array<{
      time: string
      count: number
      name: string
    }>
  }>({
    pv: [],
    timeConsumes: []
  })

  useEffect(() => {
    ;(async () => {
      const stackConsumes = await performanceInteractor.getPerformanceStack(performanceParam)
      setStackConsumes(stackConsumes)
      const performanceConsumes = await performanceInteractor.getPerformanceStageTime(performanceParam)
      setPerformanceConsumes(performanceConsumes)
      const quota = await performanceInteractor.getQuotaData(performanceParam)
      setQuota(quota)
      const pageList = await performanceInteractor.getPerformancePageList(performanceParam)
      setPageList(pageList)
    })()
  }, [])

  return { quota, stackConsumes, performanceConsumes, pageList, performanceParam, setPerformanceParam }
}

export default usePerformanceInit
