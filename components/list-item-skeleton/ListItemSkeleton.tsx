import { ContentContainer } from '../../components';

export const ListItemSkeleton = () => (
  <div className="border-b">
    <ContentContainer>
      <div className="w-full h-24  mx-auto mt-0 p-4 pl-7">
        <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-9">
          <div className="w-12 flex-none bg-gray-300 h-12 rounded-full "></div>
          <div className="flex flex-grow flex-col space-y-3">
            <div className="w-full bg-gray-300 h-6"></div>
            <div className="w-5/6 bg-gray-300 h-6"></div>
          </div>
        </div>
      </div>
    </ContentContainer>
  </div>
);
