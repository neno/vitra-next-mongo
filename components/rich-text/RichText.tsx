import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ContentContainer } from 'components';
import { IRichTextProps } from './RichText.type';

export const RichText: FC<IRichTextProps> = ({ text }) => {
  return (
    <ContentContainer isSection>
      <ReactMarkdown className="py-4" rehypePlugins={[rehypeRaw]}>
        {text}
      </ReactMarkdown>
    </ContentContainer>
  );
};
