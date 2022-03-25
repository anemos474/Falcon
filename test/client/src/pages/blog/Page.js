import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BlogPageQuery } from '@deity/falcon-blog-data';
import { H1 } from '@deity/falcon-ui';
import { BlogPostLayout, CMSContent, PageLayout } from '@deity/falcon-ui-kit';
import { withRouter } from 'react-router-dom';

const Page = ({ match: { params } }) => {
  const { id } = params;

  return (
    <PageLayout>
      <BlogPageQuery variables={{ id }}>
        {({ data: { blogPage } }) => (
          <>
            <BlogPostLayout>
              <Helmet>
                <title>{blogPage.title}</title>
              </Helmet>
              <H1 mb="md">{blogPage.title}</H1>
              <CMSContent html={blogPage.content} />
            </BlogPostLayout>
          </>
        )}
      </BlogPageQuery>
    </PageLayout>
  );
};

export default withRouter(Page);
