import { createUrl } from '@/helper/functions';
import { WithdrawalRequestType } from '@/types';
import { Avatar } from 'primereact/avatar';

function CompletedRequestAccordionHeader({
  data,
}: {
  data: WithdrawalRequestType;
}) {
  return (
    <tr className="w-full">
      <td className="px-3 py-2 text-sm border-b border-gray-200 flex-row">
        <div className="flex justify-around align-middle text-center items-center gap-2 flex-row">
          <Avatar
            image={createUrl(data.user.imageUrl)}
            shape="circle"
            size="normal"
            className="border-2 justify-stretch border-green-600"
          />
          <div className="flex items-start flex-col">
            <p>{data.user.name}</p>
            <p className="text-xs whitespace-normal break-words">
              {data.user.email}
            </p>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default CompletedRequestAccordionHeader;
