class InjectionToken<T> {
  constructor(public value: T) {
  }
}

class Injector {

  // @ts-ignore
  private readonly dependencies: Map<InjectionToken<any>, any> = new Map();

  provide<T>(dependency: T): InjectionToken<T> {
    const token = new InjectionToken(dependency);
    this.dependencies.set(token, dependency);
    return token;
  }

  inject<T>(token: InjectionToken<T>): T {
    return this.dependencies.get(token) as T;
  }

}

function test() {
  const injector = new Injector();

  const httpClient = {
    get(url: string) {
      return "Ok"
    }
  };

  const httpClientToken = injector.provide(httpClient);

  class AppService {

    httpClient = injector.inject(httpClientToken);

  }

}

/*
    W Angular injector jest hierarchiczny: Element/Component injector ... -> Module/Route injector ... -> Root injector -> Null injector



*/
