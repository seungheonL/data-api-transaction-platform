import { useState } from 'react';
import { RequestParameter } from '../types';

export default function ApiRequestParametersInput({ onChange }: { onChange: (requestParameters: RequestParameter[]) => void }) {
  const [requestParameters, setRequestParameters] = useState<RequestParameter[]>([]);

  /**
   * add new request parameter input
   */
  function addParameter() {
    for (const { key } of requestParameters) {
      if (key.trim() === '') {
        alert('먼저 파라미터명을 모두 입력해주세요');
        return;
      }
    }

    const updatedRequestParameters = [...requestParameters];
    updatedRequestParameters.push({ key: '', type: 'string', description: '', required: false });

    setRequestParameters(updatedRequestParameters);
  }

  /**
   * update request parameter by index
   */
  function updateParameter(idx: number, data: Partial<RequestParameter>) {
    const updatedRequestParameters = [...requestParameters];
    updatedRequestParameters[idx] = { ...updatedRequestParameters[idx], ...data };

    setRequestParameters(updatedRequestParameters);

    onChange(updatedRequestParameters);
  }

  return (
    <label className="block mb-6">
      <div className="font-bold mb-2">요청 파라미터</div>
      <div>
        {requestParameters.map((parameter, idx) => (
          <div key={idx} className="flex mb-4">
            <input
              className="mr-3"
              type="text"
              placeholder="변수명"
              onChange={e => {
                updateParameter(idx, { key: e.target.value });
              }}
              value={parameter.key}
            />
            <input
              className="mr-3"
              type="text"
              placeholder="타입"
              onChange={e => {
                updateParameter(idx, { type: e.target.value });
              }}
              value={parameter.type}
            />
            <input
              type="text"
              placeholder="설명"
              onChange={e => {
                updateParameter(idx, { description: e.target.value });
              }}
              value={parameter.description}
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button className="btn btn-form-outline" onClick={() => addParameter()}>
            파라미터 추가
          </button>
        </div>
      </div>
    </label>
  );
}
