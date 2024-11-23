import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWithdrawalRequestAction } from '@/redux/slices/withdrawalRequestSlice';
import { RootState } from '@/redux/store';
import CurrentRequest from '@/components/withdrawalRequests/CurrentRequest';
import CompletedRequest from '@/components/withdrawalRequests/CompletedRequest';
import { Accordion, AccordionTab } from 'primereact/accordion';
import CompletedRequestAccordionHeader from '@/components/withdrawalRequests/CompletedRequestAccordionHeader';

enum REFUND_CATEGORY {
  CURRENT = 'current',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
}

function ReferalRefund() {
  const dispatch = useDispatch();
  const withdrawalRequests = useSelector(
    (store: RootState) => store.withdrawalRequests
  );
  const [category, setCategory] = useState<string>(REFUND_CATEGORY.CURRENT);

  useEffect(() => {
    dispatch({ type: getWithdrawalRequestAction.type });
  }, []);

  return (
    <div className="container overflow-hidden h-full">
      <ul className="m-1 text-md font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        <li className="w-full focus-within:z-10">
          <button
            onClick={() => setCategory(REFUND_CATEGORY.CURRENT)}
            className={`inline-block w-full p-4  border-r border-gray-200 rounded-s-lg focus:ring-2 hover:bg-gray-50  focus:ring-green-500 focus:outline-none focus:bg-success20percent focus:text-success focus:font-bold ${
              category === REFUND_CATEGORY.CURRENT
                ? 'bg-success20percent text-success font-bold'
                : 'bg-white'
            }`}
          >
            {REFUND_CATEGORY.CURRENT.toUpperCase()}
          </button>
        </li>
        <li className="w-full focus-within:z-10">
          <button
            onClick={() => setCategory(REFUND_CATEGORY.REJECTED)}
            className={`inline-block w-full p-4  border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:outline-none focus:bg-success20percent focus:text-success focus:font-bold ${
              category === REFUND_CATEGORY.REJECTED
                ? 'bg-success20percent text-success font-bold'
                : 'bg-white'
            }`}
          >
            {REFUND_CATEGORY.REJECTED.toUpperCase()}
          </button>
        </li>

        <li className="w-full focus-within:z-10">
          <button
            onClick={() => setCategory(REFUND_CATEGORY.ACCEPTED)}
            className={`inline-block w-full p-4  border-e-0 border-gray-200 rounded-e-lg hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:outline-none focus:bg-success20percent focus:text-success focus:font-bold ${
              category === REFUND_CATEGORY.ACCEPTED
                ? 'bg-success20percent text-success font-bold'
                : 'bg-white'
            }`}
          >
            {REFUND_CATEGORY.ACCEPTED.toUpperCase()}
          </button>
        </li>
      </ul>
      <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div
          className="inline-block min-w-full overflow-hidden rounded-lg shadow"
          style={{
            height: '30rem',
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <table className="w-full leading-normal mb-10">
            <TableHeader category={category} />
            <tbody className="overflow-y-auto">
              {category === REFUND_CATEGORY.CURRENT ? (
                withdrawalRequests.pending.map((item) => {
                  return item.debit.map((val) => (
                      <CurrentRequest
                        data={item}
                        currentRequest={val}
                        key={val._id}
                      />
                  ));
                })
              ) : category === REFUND_CATEGORY.ACCEPTED ? (
                <Accordion className="bg-white">
                  {withdrawalRequests.completed.map((item) => {
                    return (
                      <AccordionTab
                        headerClassName="p-1"
                        header={() => (
                          <CompletedRequestAccordionHeader data={item} />
                        )}
                        key={item._id}
                        contentClassName="bg-red-900 max-h-[15rem] overflow-y-scroll"
                      >
                        {item.debit.map((val) => (
                          <CompletedRequest data={val} key={item._id} />
                        ))}
                      </AccordionTab>
                    );
                  })}
                </Accordion>
              ) : (
                <Accordion className="bg-white">
                  {withdrawalRequests.failed.map((item) => {
                    return (
                      <AccordionTab
                        headerClassName="p-1"
                        header={() => (
                          <CompletedRequestAccordionHeader data={item} />
                        )}
                        key={item._id}
                        contentClassName="bg-red-900 max-h-[15rem] overflow-y-scroll"
                      >
                        {item.debit.map((val) => (
                          <CompletedRequest data={val} key={item._id} />
                        ))}
                      </AccordionTab>
                    );
                  })}
                </Accordion>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const TableHeader: React.FC<{
  category: string;
}> = ({ category }) => {
  return category == REFUND_CATEGORY.CURRENT ? (
    <thead className="sticky top-0">
      <tr>
        <th
          scope="col"
          className=" px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
        >
          Request Date
        </th>

        <th
          scope="col"
          className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
        >
          User Name
        </th>
        <th
          scope="col"
          className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
        >
          Email
        </th>
        <th
          scope="col"
          className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
        >
          Phone
        </th>
        <th
          scope="col"
          className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
        >
          Amount
        </th>

        <th
          scope="col"
          className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
        >
          Action
        </th>
      </tr>
    </thead>
  ) : null;
};

export default ReferalRefund;
