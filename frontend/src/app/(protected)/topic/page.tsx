"use client"

import { TopicStatus } from '@/services/topic/types'
import Helmet from '../_components/helmet'
import CustomTabs from '../_components/tabs'
import TopicList from './_components/topic/TopicList'

const Topic = () => {

    return (
        <Helmet title='Topic - AmigoTasks'>
            <div className='p-4'>
                <CustomTabs
                    tabs={[
                        { label: 'All', panel: <TopicList /> },
                        { label: 'New', panel: <TopicList status={TopicStatus.NEW} /> },
                        { label: 'In Progress', panel: <TopicList status={TopicStatus.IN_PROGRESS} /> },
                        { label: 'Completed', panel: <TopicList status={TopicStatus.COMPLETED} /> },
                        { label: 'Draft', panel: <TopicList status={TopicStatus.DRAFT} /> },
                        { label: 'Archived', panel: <TopicList status={TopicStatus.ARCHIVED} /> },
                    ]}
                />
            </div>
        </Helmet>
    )
}

export default Topic