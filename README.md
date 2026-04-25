# Korea-UV-Repeater-Map (redirect shim)

> Korea Ham Map 은 **[cqcq.kr](https://cqcq.kr/)** 으로 이전했습니다.

이 저장소는 구 GitHub Pages URL (`hamrini.github.io/Korea-UV-Repeater-Map/...`)
을 보존된 경로·쿼리·해시 그대로 새 도메인으로 리다이렉트하는 정적 shim 입니다.
실제 소스 코드는 [`hamrini/cqcq`](https://github.com/hamrini/cqcq) (private) 에 있습니다.

## 동작

`index.html` 과 `404.html` 모두에 메타 리프레시 + JS `location.replace` 가 들어가
있어 어떤 경로로 진입해도 `cqcq.kr` 의 동등 경로로 즉시 이동합니다.

```
hamrini.github.io/Korea-UV-Repeater-Map/r/DS0KBU?z=10
                           ↓
            cqcq.kr/r/DS0KBU?z=10
```

## 유지보수

별도 코드 없음. 정적 HTML 두 개. 변경 필요 시 두 파일의 redirect 도메인만
수정하면 됨.
