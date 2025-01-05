import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import StatusCard from '@/Components/Card/StatusCard';
import { GoPlusCircle } from 'react-icons/go';
import Container from '@/Components/Container';
import Alert from '@mui/material/Alert';
import CommonButton from '@/Components/CommonButton';

interface MonitoringStatus {
  monitors: boolean;
  users: boolean;
}

export default function Monitor({
  auth,
  status,
}: PageProps & { status?: MonitoringStatus }) {
  const statusCardsData = [
    {
      title: 'Monitoring Tasks',
      description: 'Customize monitoring tasks to fit your business.',
      status: status?.monitors ? 'complete' : '',
      link: route('monitor.task'),
    },
    {
      title: 'Users',
      description: 'Add your team members to assign permissions.',
      status: status?.users ? 'complete' : '',
      link: route('setup.user.index'),
    },
    {
      title: 'Download Owlly App',
      description:
        'Access our Food Safety App for a seamless monitoring experience!',
      status: 'complete',
      link: route('setup.monitor.app.download', 'hide/menu'),
    },
  ];

  const completedCards = statusCardsData.filter(
    (card) => card.status === 'complete'
  ).length;
  const presentedStatus = Math.round(
    (completedCards / statusCardsData.length) * 100
  );

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Monitoring Task
        </h2>
      }
    >
      <Head title="Monitoring Task" />

      <div className="max-w-7xl mx-auto">
        <Container>
          <div>
            <div className="overflow-hidden sm:rounded-lg">
              <h1 className="pb-6 text-gray-900 text-2xl md:text-2xl lg:text-3xl font-bold">
                Let's create your Food Safety System
              </h1>

              {/* Progress Bar */}
              <div className="px-2 py-2 md:py-4 lg:py-6 bg-gray-200 shadow-sm rounded-xl border-l-2 mb-4 md:mb-6 lg:mb-10">
                <div className="flex mb-2 items-center justify-between">
                  {/* Other content here */}
                </div>

                {/* Progress Bar and Button Side by Side */}
                <div className="flex items-center space-x-4 ml-5">
                  <div className="flex-1">
                    <div
                      className="overflow-hidden h-2 text-xs flex rounded bg-white"
                      style={{ height: '16px', borderRadius: '12px' }}
                    >
                      <div
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white rounded-lg justify-center bg-gradient-org-red"
                        style={{ width: presentedStatus + '%' }}
                      ></div>
                    </div>
                  </div>
                  {/* Create Button */}
                  <button
                    className="bg-gray-400 hover:bg-gray-500 text-white text-md font-medium py-2 px-4 rounded-full bg-gradient-org-red flex items-center gap-2"
                    onClick={() => {
                      // Add onClick handler logic here if needed
                    }}
                  >
                    <GoPlusCircle className="text-xl" />
                    Create
                  </button>
                </div>
              </div>

              {/* Status Cards */}
              <div className="space-y-4">
                {statusCardsData.map((card, index) => (
                  <StatusCard
                    key={index}
                    title={card.title}
                    description={card.description}
                    status={card.status}
                    link={card.link}
                  />
                ))}

                <Alert
                  severity="info"
                  className="!border-dark  fill-gray-500!text-dark !bg-gray-200"
                  action={
                    <CommonButton
                      href={route('setup.monitor.demo')}
                      className="!bg-black text-white"
                    >
                      Book A Demo
                    </CommonButton>
                  }
                >
                  If you want our help in setting up your monitoring, please
                  send us a copy of your existing sheets and schedule a demo
                  call with us.
                </Alert>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </AuthenticatedLayout>
  );
}
