import React, { useState, useEffect } from 'react';
import CardWrapper from '@src/pages/AppSearch/components/CardWrapper';
import hu from '@ali/hara-utils';
import {
  totalsrp_cd_total_exp,
  totalsrp_cd_total_clk,
  totalsrp_cd_age_exp,
  totalsrp_cd_age_clk,
  totalsrp_cd_choice_exp,
  totalsrp_cd_choice_clk,
  totalsrp_cd_enquire_exp,
  totalsrp_cd_enquire_clk,
} from '@utils/logs';
import { Title, Standard, Age, Search, Tips } from './components';

const prefixCls = 'growth-child__sc';

function isEmptyObj(obj) {
  for (let i in obj) {
    // 如果不为空，则会执行到这一步，返回true
    return true;
  }
  return false; // 如果为空,返回false
}

const GrowthChildSc = React.memo((props = {}) => {
  const { h5Toast } = hu;
  const {
    data: { hit = {} } = {},
    sc_pos = '', // 卡片在当前页排序
    hid = '', // 本次搜索唯一标识
    purpose = '', // 本次搜索意图
    query = '', // 搜索词
  } = props;
  const { datas = [], title = '0-6岁婴幼儿发育标准' } = hit;

  // 公共参数
  const publicParams = {
    sc_name: 'child_development',
    query,
    sc_pos,
    hid,
    purpose,
    tab: 'total',
  };

  // 组合成Picker组件需要的数据结构
  const ageData = [];
  datas.forEach((item) => {
    ageData.push({
      label: item.age,
      value: item.age,
    });
  });

  // query中默认是否有年龄数据
  const defaultAgeData =
    datas &&
    datas.length > 0 &&
    datas.find((item) => item.selected && item.selected === true);

  const newAgeData = defaultAgeData || {};

  const [selectAgeData, setSelectAgeData] = useState(newAgeData);
  const [age, setAge] = useState(newAgeData?.age || '');

  // 是否有默认数据
  console.log('selectAgeData', newAgeData);
  const hasData = isEmptyObj(newAgeData);

  h5Toast(`默认数据111：${newAgeData}, ${selectAgeData}, ${hasData}, ${JSON.stringify(newAgeData)}`);

  const hasAge = age !== '';
  const setAgeVal = (v) => {
    setAge(v);
  };

  // 整个sc埋点数据
  const CD_TOTAL_DATA = {
    ...publicParams,
    sps_value: '婴幼儿发育标准sc',
    sps: 1,
    md: '婴幼儿发育标准sc',
  };

  // 筛选区埋点数据
  const CD_CHOICE_DATA = {
    ...publicParams,
    sps_value: hasData ? selectAgeData.age : '请选择年龄',
    sps: hasData ? 1 : 2,
    md: '筛选区',
  };

  // 年龄选择器埋点数据
  const CD_AGE_DATA = {
    ...publicParams,
    sps_value: age || '取消',
    sps: age ? 1 : 2,
    md: '年龄选择器',
  };

  // 查询按钮 埋点数据
  const CD_ENQUIRE_DATA = {
    ...publicParams,
    sps_value: '立即查询',
    sps: 1,
    md: '查询按钮',
  };
  // 埋点
  useEffect(() => {
    // 发育标准整个sc曝光
    totalsrp_cd_total_exp(CD_TOTAL_DATA);

    // 筛选区曝光
    totalsrp_cd_choice_exp(CD_CHOICE_DATA);

    // 查询按钮曝光
    totalsrp_cd_enquire_exp(CD_ENQUIRE_DATA);
  }, []);

  // 点击 整个sc 埋点
  const clickGrowthSc = () => {
    totalsrp_cd_total_clk(CD_TOTAL_DATA);
  };

  // 筛选区点击 埋点
  const clickChoice = () => {
    totalsrp_cd_choice_clk(CD_CHOICE_DATA);
    // 年龄选择器 曝光
    totalsrp_cd_age_exp(CD_AGE_DATA);
  };
  // 年龄选择器点击 埋点
  const clickAge = () => {
    totalsrp_cd_age_clk(CD_AGE_DATA);
  };
  // 查询数据
  const searchStandard = () => {
    // 埋点
    totalsrp_cd_enquire_clk(CD_ENQUIRE_DATA);
    if (!hasAge) {
      h5Toast('请先选择月龄/年龄');
      return;
    }
    // age: 选择日期后是数组，默认是字符串
    const target = typeof age === 'string' ? age : age[0];
    const data = datas.find((item) => item.age === target);
    setSelectAgeData(data);
  };

  return (
    <CardWrapper>
      <div className={prefixCls} onClick={clickGrowthSc}>
        <Title title={title} />
        <Age
          setAgeVal={setAgeVal}
          ageData={ageData}
          age={age}
          clickChoice={clickChoice}
          clickAge={clickAge}
        />
        <Search searchStandard={searchStandard} />
        {hasData ? <Standard selectAgeData={selectAgeData} /> : null}
        <Tips hasData={hasData} />
      </div>
    </CardWrapper>
  );
});
export default GrowthChildSc;
