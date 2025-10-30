'use client';

import { Plus, Edit } from 'lucide-react';

export default function ArticlesPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            文章管理
          </h1>
          <p className="text-gray-600">
            管理博客文章和教程内容
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="h-4 w-4" />
          新建文章
        </button>
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Edit className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            文章管理系统
          </h2>
          <p className="text-gray-600 mb-6">
            功能开发中，即将上线
          </p>
          <div className="inline-flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              文章CRUD
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              富文本编辑器
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              SEO优化
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              分类标签
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              发布管理
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

