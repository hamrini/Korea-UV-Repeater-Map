
const EARTH_RADIUS_METER = 6364500;

/**
 * 두 지점간의 거리를 미터로 반환합니다. 대한민국에서 크게 벗어난 지점을 입력할 경우 오류를 일으킬 수 있습니다.
 * @param lat1 지점1의 위도를 60분법으로 입력하되, 'ㅇㅇ도 00분 00초' 형식이 아니라, '도'로 표현하십시오
 * @param lon1 지점1의 경도를 입력하십시오
 * @param lat2 지점2의 위도를 입력하십시오
 * @param lon2 지점2의 경도를 입력하십시오
 */
function distance(lat1, lon1, lat2, lon2) {
    const latitude1 = radToDegree(90 - lat1);
    const longitude1 = radToDegree(lon1);
    const latitude2 = radToDegree(90 - lat2);
    const longitude2 = radToDegree(lon2);

    const alpha1 = latitude1;
    const alpha2 = latitude2;

    const beta2 = Math.abs(longitude2 - longitude1);

    const cosValue = Math.sin(alpha2) * Math.cos(beta2) * Math.sin(alpha1)
        + Math.sin(alpha2) * Math.sin(beta2) * 0
        + Math.cos(beta2) * Math.cos(alpha1);

    const angle = Math.acos(cosValue);
    return angle * EARTH_RADIUS_METER;
}

function radToDegree(degree){
    return degree * Math.PI / 180;
}