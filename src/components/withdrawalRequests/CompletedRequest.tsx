import { WithdrawalTransactionType } from '@/types';
import { DateTime } from 'luxon';

type Props = {
  data: WithdrawalTransactionType;
};

function CompletedRequest({ data }: Props) {
  console.log('here');
  return (
    <tr className="w-full">
      <td className="px-5 text-sm border-b border-gray-200">
        <div className="flex items-center justify-center">
          <div className="flex-shrink-0 justify-center">
            <p className="font-semibold text-xs">Update date:</p>
            <p>
              {DateTime.fromISO(data.createdAt).toFormat('dd-MM-yy, hh:mm a')}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 text-sm border-b border-gray-200">
        <div className="flex items-center justify-center">
          <div className="flex-shrink-0 justify-center">
            <p className="font-semibold text-xs">Amount:</p>
            <p>{data.amount}</p>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default CompletedRequest;
