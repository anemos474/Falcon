import React from 'react';
import { T } from '@deity/falcon-i18n';
import { BlogPostQuery } from '@deity/falcon-blog-data';
import { H1, Breadcrumbs, Breadcrumb } from '@deity/falcon-ui';
import { BlogPostLayout, FormattedDate, CMSContent, PageLayout, BreadcrumbLink } from '@deity/falcon-ui-kit';

const Post = ({ match: { params } }) => {
  const { path } = params;
  return (
    <PageLayout>
      <BlogPostQuery variables={{ id: path }}>
        {({ data: { blogPost } }) => (
          <>
            <Breadcrumbs alignSelf="flex-start">
              <BreadcrumbLink to="/">
                <T id="name" />
              </BreadcrumbLink>
              <BreadcrumbLink to="/blog">
                <T id="blog.title" />
              </BreadcrumbLink>
              <Breadcrumb>{blogPost.title}</Breadcrumb>
            </Breadcrumbs>
            <BlogPostLayout>
              <H1>{blogPost.title}</H1>
              <FormattedDate mb="xl" mr="xl" value={blogPost.date} />
              <CMSContent html={blogPost.content} />
            </BlogPostLayout>
          </>
        )}
      </BlogPostQuery>
    </PageLayout>
  );
};

export default Post;
