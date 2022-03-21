<template>
  <tr>
    <td valign="top">
      <p align="center">
        <font size="2"><b>Criação de Conta - Cadastramento de Usuário</b></font>
      </p>
      <div align="center">
        <center>
          <table
            border="1"
            cellpadding="5"
            cellspacing="0"
            style="border-collapse: collapse"
            bordercolor="#111111"
            id="AutoNumber3"
          >
            <tr>
              <td align="left"><font size="2">Nome:</font></td>
              <td><input type="text" name="nome" size="50" /></td>
            </tr>
            <tr>
              <td align="left"><font size="2">Endereço:</font></td>
              <td>
                <input type="text" name="endereco" size="50" />
              </td>
            </tr>
            <tr>
              <td align="left"><font size="2">Telefone:</font></td>
              <td>
                <input type="text" name="telefone" size="30" />
              </td>
            </tr>
            <tr>
              <td align="left"><font size="2">Email:</font></td>
              <td><input type="text" name="email" size="30" /></td>
            </tr>
            <tr>
              <td align="left"><font size="2">Senha:</font></td>
              <td>
                <input type="password" name="senha1" size="20" />
              </td>
            </tr>
            <tr>
              <td align="left">
                <font size="2">Confirma Senha:</font>
              </td>
              <td>
                <input type="password" name="senha2" size="20" />
              </td>
            </tr>
            <tr>
              <td align="left">
                <font size="2">Tipo de Conta:</font>
              </td>
              <td>
                <input
                  type="radio"
                  name="tipoConta"
                  value="Candidato"
                />
                Candidato
                <input
                  type="radio"
                  name="tipoConta"
                  value="Candidato"
                />
                Empresa
              </td>
            </tr>
            <tr>
              <td align="left"><font size="2">CPF:</font></td>
              <td><input type="text" name="cnpj" size="20" /></td>
            </tr>
            <tr>
              <td align="left">
                <font size="2">Razão Social:</font>
              </td>
              <td>
                <input type="text" name="razaoSocial" size="30" />
              </td>
            </tr>
            <tr>
              <td align="left"><font size="2">CNPJ:</font></td>
              <td><input type="text" name="cnpj" size="20" /></td>
            </tr>
            <tr>
              <td colspan="2">
                <p align="center">
                  <input
                    type="button"
                    value="Criar Conta"
                    onclick="location.href='09_03_Tela_de_Ofertas_Candidato.html'"
                  />
                </p>
              </td>
            </tr>
          </table>
        </center>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'UserRegistration'
}
</script>

<style></style>