import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { SidebarDashboard} from '@/components/sidebar-dashboard'
import { Label } from '@/components/ui/label'

export default async function DashBoard() {
      return (
      <main className="flex flex-col p-4">
        {/* <SidebarDashboard></SidebarDashboard> */}
        {/* <h1>Test</h1> */}
        {/* <Button>Test</Button> */}
        <div className="grid grid-rows-5 grid-flow-col gap-4"> 
          <div className="row-span-5 bg-green-200 ">
            <h1 className="text-2xl font-bold">Test</h1>

          </div>
          <div className="row-span-5 col-span-4">
            <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Course Overview</div>
            <Label>Course</Label>
          </div>
        </div>
      </main>
    )
  }