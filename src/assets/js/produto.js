export const tokenApi = 'https://production.bredasapi.com.br/overall/auth/usuario';
export const productApi = 'https://production.bredasapi.com.br/erpproduto/integracaounimar';
export const post = { Grupo: 'unimar', Login: 'unimar', Senha: 'unimar' };

export async function getToken() {
  const tokenExpirado = localStorage.getItem("token_expires");
  if (tokenExpirado && Date.now() < parseInt(tokenExpirado)) {
    return localStorage.getItem("token");
  } else {
    try {
      const response = await fetch(tokenApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      const data = await response.json();
      const token = data.data.access_token;
      const expireDate = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("token", token);
      localStorage.setItem("token_expires", expireDate);
      return token;
    } catch (error) {
      console.error('Erro ao gerar token:', error);
      return null;
    }
  }
}

export async function getProducts(token) {
  try {
    const response = await fetch(productApi, {
      method: 'GET',
      headers: { 'Authorization': token }
    });
    if (!response.ok) throw new Error(`Erro: ${response.status}`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
}