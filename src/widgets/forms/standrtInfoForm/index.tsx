import {
  $errorEgripFile,
  $errorInn,
  $errorInnFile,
  $errorOgrip,
  $errorOgripFile,
  $errorRegisterDate,
  $errorRentFile,
  $standartForm,
  changedEgripFile,
  changedInn,
  changedInnFile,
  changedIsDoc,
  changedOgrip,
  changedOgripFile,
  changedRegisterDate,
  changedRentFile,
} from "@/features";
import {
  FileInput,
  StyledCheckBox,
  StyledDateInput,
  StyledForm,
  StyledFormColumn,
  StyledInput,
} from "@/widgets";
import { useStore } from "effector-react";

type StandartFormProps = {
  dateMode: boolean;
};

export const StandartForm = ({ dateMode }: StandartFormProps) => {
  //инн
  const form = useStore($standartForm);
  const errorInn = useStore($errorInn);
  const innOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changedInn(e.target.value);
  };

  const errorInnFile = useStore($errorInnFile);
  const handleFileInnChange = (e: File | null) => {
    changedInnFile(e);
  };

  //огрип
  const errorOgrip = useStore($errorOgrip);
  const ogripOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changedOgrip(e.target.value);
  };
  const errporOgripFile = useStore($errorOgripFile);

  const handleFileOgripChange = (e: File | null) => {
    changedOgripFile(e);
  };

  //register date
  const dateError = useStore($errorRegisterDate);
  const datepOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changedRegisterDate(e.target.value);
  };

  //выписка
  const egripError = useStore($errorEgripFile);
  const handleFileEgripChange = (e: File | null) => {
    changedEgripFile(e);
  };

  //аренда
  const rentError = useStore($errorRentFile);

  const handleFileRentChange = (e: File | null) => {
    changedRentFile(e);
  };
  const isDocHandler = () => {
    changedIsDoc(!form.isDoc);
  };
  return (
    <StyledForm>
      <StyledFormColumn>
        <StyledInput
          value={form.inn}
          onChange={innOnChange}
          placeHolder="хххххххххх"
          labelText="ИНН*"
          error={errorInn?.message}
        />
        <FileInput
          onChange={handleFileInnChange}
          labelText="Скан ИНН"
          error={errorInnFile?.message}
        />
        <StyledInput
          value={form.ogrip}
          onChange={ogripOnChange}
          placeHolder="ххххххххххххххх"
          labelText="ОГРНИП**"
          error={errorOgrip?.message}
        />
        <FileInput
          onChange={handleFileOgripChange}
          labelText="Скан ОГРНИП"
          error={errporOgripFile?.message}
        />
      </StyledFormColumn>
      <StyledFormColumn>
        {dateMode && (
          <StyledDateInput
            value={form.registerDate}
            onChange={datepOnChange}
            placeHolder="дд.мм.гггг"
            labelText="Дата регистрации*"
            error={dateError?.message}
          />
        )}
        <FileInput
          onChange={handleFileEgripChange}
          labelText="Скан выписки из ЕГРИП (не старше 3 месяцев)*"
          error={egripError?.message}
        />
        <FileInput
          onChange={handleFileRentChange}
          labelText="Скан договора аренды помещения (офиса)"
          error={rentError?.message}
        />
        <StyledCheckBox
          onChange={isDocHandler}
          value={form.isDoc}
          labelText="нет договора"
        />
      </StyledFormColumn>
    </StyledForm>
  );
};
