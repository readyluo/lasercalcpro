'use client';

import { useState, useEffect } from 'react';
import { Save, RefreshCw, Settings as SettingsIcon } from 'lucide-react';

interface Setting {
  id: number;
  setting_key: string;
  setting_value: string;
  description: string;
  is_public: boolean;
  updated_at: string;
}

export default function SystemSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changes, setChanges] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/settings');
      const data = await response.json();

      if (data.success) {
        setSettings(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setChanges({ ...changes, [key]: value });
  };

  const handleSave = async (key: string) => {
    if (!(key in changes)) return;

    setSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          setting_key: key,
          setting_value: changes[key],
        }),
      });

      if (response.ok) {
        // Remove from changes and refresh
        const newChanges = { ...changes };
        delete newChanges[key];
        setChanges(newChanges);
        fetchSettings();
      } else {
        alert('保存失败');
      }
    } catch (error) {
      console.error('Failed to save setting:', error);
      alert('保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const promises = Object.entries(changes).map(([key, value]) =>
        fetch('/api/admin/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            setting_key: key,
            setting_value: value,
          }),
        })
      );

      await Promise.all(promises);
      setChanges({});
      fetchSettings();
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('保存失败');
    } finally {
      setSaving(false);
    }
  };

  const getValue = (key: string, defaultValue: string): string => {
    return key in changes ? changes[key] : defaultValue;
  };

  const groupedSettings = settings.reduce((acc, setting) => {
    let group = 'general';
    if (setting.setting_key.startsWith('email_')) group = 'email';
    else if (setting.setting_key.includes('adsense') || setting.setting_key.includes('ga_')) group = 'analytics';
    else if (setting.setting_key.includes('maintenance')) group = 'maintenance';
    
    if (!acc[group]) acc[group] = [];
    acc[group].push(setting);
    return acc;
  }, {} as Record<string, Setting[]>);

  const groupNames: Record<string, string> = {
    general: '常规设置',
    email: '邮件设置',
    analytics: '分析与广告',
    maintenance: '维护模式',
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            系统设置
          </h1>
          <p className="text-gray-600">
            配置网站系统参数
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchSettings}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            刷新
          </button>
          {Object.keys(changes).length > 0 && (
            <button
              onClick={handleSaveAll}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              保存所有更改 ({Object.keys(changes).length})
            </button>
          )}
        </div>
      </div>

      {/* Settings Groups */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSettings).map(([groupKey, groupSettings]) => (
            <div key={groupKey} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-primary-600" />
                {groupNames[groupKey] || groupKey}
              </h2>
              
              <div className="space-y-4">
                {groupSettings.map((setting) => (
                  <div key={setting.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-900 mb-1">
                          {setting.description || setting.setting_key}
                        </label>
                        <p className="text-xs text-gray-500 mb-2">
                          Key: {setting.setting_key}
                        </p>
                        {setting.setting_key.includes('message') || 
                         setting.setting_key.includes('description') ? (
                          <textarea
                            value={getValue(setting.setting_key, setting.setting_value)}
                            onChange={(e) => handleChange(setting.setting_key, e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        ) : setting.setting_key.includes('enabled') || 
                           setting.setting_key.includes('mode') ||
                           setting.setting_key === 'enable_pdf_export' ? (
                          <select
                            value={getValue(setting.setting_key, setting.setting_value)}
                            onChange={(e) => handleChange(setting.setting_key, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            <option value="true">启用</option>
                            <option value="false">禁用</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={getValue(setting.setting_key, setting.setting_value)}
                            onChange={(e) => handleChange(setting.setting_key, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          最后更新: {new Date(setting.updated_at).toLocaleString('zh-CN')}
                        </p>
                      </div>
                      {setting.setting_key in changes && (
                        <button
                          onClick={() => handleSave(setting.setting_key)}
                          disabled={saving}
                          className="mt-6 px-3 py-1.5 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition-colors disabled:opacity-50"
                        >
                          保存
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Help Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">
          💡 使用提示
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 修改配置后请点击"保存"按钮使更改生效</li>
          <li>• 维护模式将使网站对普通用户不可访问</li>
          <li>• 重要的密钥信息请妥善保管，不要泄露</li>
        </ul>
      </div>
    </div>
  );
}

