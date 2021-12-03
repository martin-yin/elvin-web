import moment from 'moment'
import { useEffect, useState } from 'react'
import { performanceInteractor } from '../../../core/interactors'
import { PerformanceIF } from '../../../interface'

const usePerformanceInit = () => {
  const [quota, setQuota] = useState<PerformanceIF.PerformanceQuota>()
  const [performanceParams, setPerformanceParams] = useState<PerformanceIF.PerformanceParams>({
    time_grain: 'minute',
    start_time: moment().format('YYYY-MM-DD'),
    end_time: moment().format('YYYY-MM-DD')
  })
  const [stackConsumes, setStackConsumes] = useState<any>([])
  const [performances, setPerformances] = useState<PerformanceIF.Performances>([])
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
      const stackConsumes = await performanceInteractor.getPerformanceStack(performanceParams)
      setStackConsumes(stackConsumes)
      const performanceConsumes = await performanceInteractor.getPerformanceStageTime(performanceParams)
      setPerformanceConsumes(performanceConsumes)
      const quota = await performanceInteractor.getQuotaData(performanceParams)
      setQuota(quota)
      const performances = await performanceInteractor.getPerformancePages(performanceParams)
      setPerformances(performances)
    })()
  }, [])

  return { quota, stackConsumes, performanceConsumes, performances, performanceParams, setPerformanceParams }
}

export default usePerformanceInit
