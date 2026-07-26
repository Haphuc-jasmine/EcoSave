'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';

export const themeConfig = {
  token: {
    colorPrimary: '#1F7A5C',
    colorSuccess: '#1F7A5C',
    colorWarning: '#F2B84B',
    colorError: '#B94A48',
    colorInfo: '#1F7A5C',
    colorBgBase: '#FFFFFF',
    colorBgLayout: '#F6F8F7',
    colorTextBase: '#16352B',
    colorTextSecondary: '#5D6B66',
    borderRadius: 12,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  components: {
    Button: {
      borderRadius: 10,
      fontWeight: 600,
      colorPrimaryHover: '#16352B',
    },
    Card: {
      borderRadius: 14,
      boxShadow: '0 4px 12px rgba(22, 53, 43, 0.05)',
    },
    Badge: {
      colorError: '#B94A48',
    },
  },
};

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={themeConfig}>
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
